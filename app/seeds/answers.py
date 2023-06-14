from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_answers():
    a1 = Answer(
        answer='According to our current understanding of physics, nothing can travel faster than the speed of light in a vacuum. This is known as the universal speed limit. However, there are some phenomena that can appear to exceed the speed of light, such as certain particles that can travel faster than light through a medium like water or air, but they still do not exceed the speed of light in a vacuum.', 
        user_id=2,
        question_id=1
    )
    a3 = Answer(
        answer='''A compiler is a program that translates source code written in a high-level programming language into machine code that can be executed by a computer. The machine code is usually in the form of assembly code or object code, which can be executed directly by the computer's central processing unit (CPU). Compilers are used to create executable programs, libraries and other software components from source code.''', 
        user_id=2,
        question_id=3
    )

    a5 = Answer(
        answer='There are many herbs that are easy to grow at home, but some of the most popular and easiest to care for include basil, cilantro, mint, parsley, chives, and thyme. These herbs can be grown in pots or in a small garden bed, and they require little maintenance. They also add flavor and nutrition to your cooking. If you are new to gardening, I recommend starting with one of these herbs and then expanding your collection as you gain more experience.', 
        user_id=3,
        question_id=5
    )
    a6 = Answer(
        answer='An interpreted language is a type of programming language that is executed directly by an interpreter, rather than being first compiled into machine code. This means that the code is read and executed line by line, rather than being translated into machine code that the computer can execute directly. Some examples of interpreted languages include Python, Ruby, and JavaScript.', 
        user_id=3,
        question_id=6
    )
    a7 = Answer(
        answer='A medieval village typically consisted of small, thatched-roof houses made of wattle and daub (a mixture of mud, clay, and straw). These houses were often grouped together around a central green or common area. The village would have also had a church or chapel, and possibly a manor house or castle belonging to the local lord or noble. There would have been small plots of land for growing crops and raising animals, as well as a mill for grinding grain. The village would have been surrounded by a wooden or stone wall to protect against raiders. Overall, a medieval village would have been a self-sufficient community, with residents working together to farm, trade and defend their land.', 
        user_id=2,
        question_id=7
    )
    a8 = Answer(
        answer='''Lorem Ipsum is dummy text used as a placeholder in the design and typesetting industry. It is often used as a placeholder when the final text is not yet available or when the designer wants to focus on the visual aspect of a design without being distracted by the content. The text is derived from a passage in Cicero's De Finibus Bonorum et Malorum (On the Ends of Good and Evil), written in 45 BC.''', 
        user_id=2,
        question_id=8
    )      
    db.session.add(a1)
    db.session.add(a3)

    db.session.add(a5)
    db.session.add(a6)
    db.session.add(a7)
    db.session.add(a8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))
        
    db.session.commit()