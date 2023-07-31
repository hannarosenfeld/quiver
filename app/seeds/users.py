from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic='https://live.staticflickr.com/4818/46278127882_ce169982d9_b.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_pic='https://cdn.discordapp.com/attachments/1063151852084023408/1119302494682620015/IMG_1886.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_pic='https://is3-ssl.mzstatic.com/image/thumb/Purple113/v4/e8/16/44/e8164461-6d33-db96-7031-93cfdf4176bf/source/512x512bb.jpg')
    

    user3 = User(
        username='Intro', email='john.doe@example.com', password='password', profile_pic='https://pbs.twimg.com/media/EVP_qy-UUAAo_0-.jpg')
    user4 = User(
        username='ColinRobinson', email='jane.smith@example.com', password='password', profile_pic='https://static.wikia.nocookie.net/whatwedointheshadows/images/8/86/Colin_Robinson_Profile_S1.jpg')
    user5 = User(
        username='MichaelJohnson', email='michael.johnson@example.com', password='password', profile_pic='https://as1.ftcdn.net/v2/jpg/04/08/88/76/1000_F_408887642_kFN8YIqu8AjlRx3bRgvoGvlUGOVF6y0h.jpg')
    user6 = User(
        username='Laszlo', email='emily.brown@example.com', password='password', profile_pic='https://static.wikia.nocookie.net/whatwedointheshadows/images/3/38/Laszlo_Profile_S3.jpg')
    user7 = User(
        username='WilliamWilson', email='william.wilson@example.com', password='password', profile_pic='https://assets.fxnetworks.com/cms-next/production/53f23577-288c-46a1-8aac-3fbf8cb49ab1.jpg')
    user8 = User(
        username='ElizabethLee', email='elizabeth.lee@example.com', password='password', profile_pic='https://arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/THUZORKOEJB77IACV5BK42YYYY.jpg')
    user9 = User(
        username='Nandor', email='james.martin@example.com', password='password', profile_pic='https://static.wikia.nocookie.net/whatwedointheshadows/images/a/ac/Nandor_Profile_S3.jpg')
    user10 = User(
        username='EmmaAnderson', email='emma.anderson@example.com', password='password', profile_pic='https://pagesix.com/wp-content/uploads/sites/3/2023/05/NYPICHPDPICT000009972929-2.jpg')
    user11 = User(
        username='DanielGarcia', email='daniel.garcia@example.com', password='password', profile_pic='https://people.com/thmb/nOz5CpHund2YrAQLDyc9SMbt1DI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(959x332:961x334)/Lisa-Rinna-030723-01-2000-6b921ac4fe7241788d5dbcf84ef1efe6.jpg')
    user12 = User(
        username='OliviaMartinez', email='olivia.martinez@example.com', password='password', profile_pic='https://craftcuttersupply.com/cdn/shop/products/holo_glitter_pink.jpg')
    user13 = User(
        username='LiamRobinson', email='liam.robinson@example.com', password='password', profile_pic='https://cdn.discordapp.com/attachments/975547012164517922/1134528095035072522/image0.jpg')
    user14 = User(
        username='AvaClark', email='ava.clark@example.com', password='password', profile_pic='https://cdn.discordapp.com/attachments/975547012164517922/1134528323687551046/image0.jpg')
    user15 = User(
        username='NoahWright', email='noah.wright@example.com', password='password', profile_pic='https://as1.ftcdn.net/v2/jpg/00/97/15/28/1000_F_97152819_WXI4Qd4aHPAMFiihCijqB8B7Rs2Q8NXV.jpg')
    user16 = User(
        username='SophiaHill', email='sophia.hill@example.com', password='password', profile_pic='https://media1.popsugar-assets.com/files/thumbor/cqA-K3QiqEvhq6TTYqaMnwe-OPo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2018/08/21/829/n/44701584/7f94693ad20252ba_GettyImages-1020273640/i/Heidi-Montag.jpg')
    user17 = User(
        username='BrianFirkus', email='ethan.green@example.com', password='password', profile_pic='https://i.discogs.com/zZdVbOIPOKXxbMz4XkaS-_GotfNrd2fFrkBeV8lv3ZI/rs:fit/g:sm/q:90/h:432/w:374/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTYxMzE0/MDQtMTY4MjA0OTU5/NC0zNDc2LmpwZWc.jpeg')
    user18 = User(
        username='IsabellaBaker', email='isabella.baker@example.com', password='password', profile_pic='https://as2.ftcdn.net/v2/jpg/01/13/63/29/1000_F_113632986_mJM2zBIuughF9DmkJMVJIHMfpWdK9YEl.jpg')
    user19 = User(
        username='Brian McCook', email='mason.turner@example.com', password='password', profile_pic='https://www.syfy.com/sites/syfy/files/2019/08/what-we-do-in-the-shadows-guillermo_0.jpg')
    user20 = User(
        username='GraceHall', email='grace.hall@example.com', password='password', profile_pic='https://media.istockphoto.com/id/613015336/photo/pink-glitter-texture-abstract-background.jpg')

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