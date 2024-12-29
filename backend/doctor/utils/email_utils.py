import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Personalization, To

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")  
TEMPLATE_ID = os.getenv("SENDGRID_TEMPLATE_ID")

def send_email(to_email, data):
    """
    Sends an email using SendGrid with a specific template and dynamic data.

    Args:
        to_email (str): Recipient's email address.
        template_id (str): SendGrid template ID.
        dynamic_data (dict): Data to populate the template.
    """
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        message = Mail(
            from_email='matheushoradev@gmail.com'
        )
        message.template_id = TEMPLATE_ID

        personalization = Personalization()
        personalization.add_to(To(to_email))
        personalization.dynamic_template_data = data
        message.add_personalization(personalization)

        response = sg.send(message)
        print(f"Email sent: {response.status_code}")
        return response
    except Exception as e:
        print(f"An error occurred: {e}")
        return None