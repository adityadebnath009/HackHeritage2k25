from twilio.rest import Client

import os
from  dotenv import load_dotenv
load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')

TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')


client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def sms_sender(to_phone: str, message: str, from_phone: str ):
    
    try:
        message = client.messages.create(
            body = message,
            from_=from_phone,
            to=to_phone
        )
        return {"status": "success", "message_sid": message.sid}
    except Exception as e:
        return {"status": "error", "error": str(e)}

