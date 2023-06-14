from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_questions():
    q1 = Question(
        title='Is there any thing that travels faster than light?', 
        user_id=1
    )
    q2 = Question(
        title='How should you plan your vegetable garden?', 
        user_id=1
    )
    q3 = Question(
        title='What is a compiler?', 
        user_id=3
    )
    q4 = Question(
        title='What are some of the most protein-rich foods?', 
        user_id=1
    )
    q5 = Question(
        title='What is the easiest herb to grow at home?', 
        user_id=2
    )
    q6 = Question(
        title='What is an interpreted language?', 
        user_id=2
    )
    q7 = Question(
        title='What did a medieval village look like?', 
        user_id=1
    )
    q8 = Question(
        title='What does Lorem Ipsum mean?', 
        user_id=3
    )
    q9 = Question(
        title='Which foods are highest in fiber?', 
        user_id=3
    )
    q10 = Question(
        title='Do you believe in astrology, and why or why not?', 
        user_id=1
    )        
    db.session.add(q1)
    db.session.add(q2)
    db.session.add(q3)
    db.session.add(q4)
    db.session.add(q5)
    db.session.add(q6)
    db.session.add(q7)
    db.session.add(q8)
    db.session.add(q9)    
    db.session.add(q10)    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()