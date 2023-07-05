from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

day1 = datetime.strptime('2023-01-11', '%Y-%m-%d')
day2 = datetime.strptime('2023-02-03', '%Y-%m-%d')
day3 = datetime.strptime('2023-05-10', '%Y-%m-%d')
day4 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day5 = datetime.strptime('2023-03-10', '%Y-%m-%d')
day6 = datetime.strptime('2023-04-20', '%Y-%m-%d')
day7 = datetime.strptime('2023-06-20', '%Y-%m-%d')
day8 = datetime.strptime('2022-12-08', '%Y-%m-%d')
day9 = datetime.strptime('2023-05-15', '%Y-%m-%d')
day10 = datetime.strptime('2021-02-02', '%Y-%m-%d')


def seed_comments(): 
    c1 = Comment(
        comment="That's super interesting. I love Wittgenstein!!",
        user_id=2,
        post_id=1,
        created_at=day1.date()
    )
    c2 = Comment(
        comment="I love Hegel!! Should start reading his work though.",
        user_id=3,
        post_id=2,
        created_at=day2.date()
    )
    c3 = Comment(
        comment="Thanks for this quick summary of a philosopher that is very hard to read/understand.",
        user_id=2,
        post_id=2,
        created_at=day3.date()
    )
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()