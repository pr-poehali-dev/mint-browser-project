import json
import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
import psycopg2
import bcrypt


def handler(event: dict, context) -> dict:
    """API для регистрации пользователей с подтверждением email"""
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        name = body.get('name', '').strip()
        
        if not email or not password or not name:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Заполните все поля'}),
                'isBase64Encoded': False
            }
        
        if len(password) < 6:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        schema = os.environ['MAIN_DB_SCHEMA']
        
        cur.execute(f'SET search_path TO {schema}')
        
        cur.execute('SELECT id FROM users WHERE email = %s', (email,))
        existing = cur.fetchone()
        
        if existing:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email уже зарегистрирован'}),
                'isBase64Encoded': False
            }
        
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        cur.execute(
            'INSERT INTO users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id',
            (email, password_hash, name)
        )
        user_id = cur.fetchone()[0]
        
        code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        expires_at = datetime.now() + timedelta(minutes=10)
        
        cur.execute(
            'INSERT INTO verification_codes (user_id, code, expires_at) VALUES (%s, %s, %s)',
            (user_id, code, expires_at)
        )
        
        conn.commit()
        
        try:
            send_verification_email(email, code, name)
        except Exception as e:
            print(f'Email send error: {e}')
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'userId': user_id, 'message': 'Код отправлен на email'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def send_verification_email(to_email: str, code: str, name: str):
    """Отправка кода подтверждения на email"""
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not smtp_password:
        raise Exception('SMTP_PASSWORD not configured')
    
    from_email = 'mintbrowser.noreply@gmail.com'
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Код подтверждения MintBrowser: {code}'
    msg['From'] = from_email
    msg['To'] = to_email
    
    html = f'''
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 36px;">MintBrowser</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #333; margin-top: 0;">Привет, {name}! 👋</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Спасибо за регистрацию в MintBrowser. Для завершения регистрации введите код подтверждения:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <div style="font-size: 48px; font-weight: bold; color: #10b981; letter-spacing: 8px;">
              {code}
            </div>
          </div>
          
          <p style="color: #999; font-size: 14px; text-align: center;">
            Код действителен 10 минут
          </p>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
          Если вы не регистрировались в MintBrowser, просто проигнорируйте это письмо.
        </p>
      </body>
    </html>
    '''
    
    part = MIMEText(html, 'html')
    msg.attach(part)
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())
