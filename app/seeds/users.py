from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic='https://live.staticflickr.com/4818/46278127882_ce169982d9_b.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_pic='https://cdn.discordapp.com/attachments/1063151852084023408/1119302494682620015/IMG_1886.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_pic='https://is3-ssl.mzstatic.com/image/thumb/Purple113/v4/e8/16/44/e8164461-6d33-db96-7031-93cfdf4176bf/source/512x512bb.jpg')
    
    # Add these 17 users
    user3 = User(
        username='JohnDoe', email='john.doe@example.com', password='password', profile_pic='https://example.com/user3.jpg')
    user4 = User(
        username='JaneSmith', email='jane.smith@example.com', password='password', profile_pic='https://example.com/user4.jpg')
    user5 = User(
        username='MichaelJohnson', email='michael.johnson@example.com', password='password', profile_pic='https://example.com/user5.jpg')
    user6 = User(
        username='EmilyBrown', email='emily.brown@example.com', password='password', profile_pic='https://example.com/user6.jpg')
    user7 = User(
        username='WilliamWilson', email='william.wilson@example.com', password='password', profile_pic='https://example.com/user7.jpg')
    user8 = User(
        username='ElizabethLee', email='elizabeth.lee@example.com', password='password', profile_pic='https://example.com/user8.jpg')
    user9 = User(
        username='JamesMartin', email='james.martin@example.com', password='password', profile_pic='https://example.com/user9.jpg')
    user10 = User(
        username='EmmaAnderson', email='emma.anderson@example.com', password='password', profile_pic='https://example.com/user10.jpg')
    user11 = User(
        username='DanielGarcia', email='daniel.garcia@example.com', password='password', profile_pic='https://example.com/user11.jpg')
    user12 = User(
        username='OliviaMartinez', email='olivia.martinez@example.com', password='password', profile_pic='https://example.com/user12.jpg')
    user13 = User(
        username='LiamRobinson', email='liam.robinson@example.com', password='password', profile_pic='https://example.com/user13.jpg')
    user14 = User(
        username='AvaClark', email='ava.clark@example.com', password='password', profile_pic='https://example.com/user14.jpg')
    user15 = User(
        username='NoahWright', email='noah.wright@example.com', password='password', profile_pic='https://example.com/user15.jpg')
    user16 = User(
        username='SophiaHill', email='sophia.hill@example.com', password='password', profile_pic='https://example.com/user16.jpg')
    user17 = User(
        username='EthanGreen', email='ethan.green@example.com', password='password', profile_pic='https://example.com/user17.jpg')
    user18 = User(
        username='IsabellaBaker', email='isabella.baker@example.com', password='password', profile_pic='https://example.com/user18.jpg')
    user19 = User(
        username='MasonTurner', email='mason.turner@example.com', password='password', profile_pic='https://example.com/user19.jpg')
    user20 = User(
        username='GraceHall', email='grace.hall@example.com', password='password', profile_pic='https://example.com/user20.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)
    db.session.add(user14)
    db.session.add(user15)
    db.session.add(user16)
    db.session.add(user17)
    db.session.add(user18)
    db.session.add(user19)
    db.session.add(user20)

    db.session.commit()

    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()