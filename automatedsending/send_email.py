import yagmail
import receiver_emails

sender_email = 'spicychickenloveyou@gmail.com'
receiver_emails = receiver_emails.list
subject = "Traffic Accident Alarm at Davis"
sender_password = "spicychicken2020"
location = "38.53689683832306, -121.76091420642089"

try:
  yag = yagmail.SMTP(user=sender_email, password=sender_password)

  contents = [
    "FYI",
    "A traffic accident has occurred on ",
    location

  ]

  yag.send(receiver_emails, subject, contents)

except Exception as e:
  print(f'Something went wrong!\n{e}')