
import mysql.connector


def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="xxxxxxxxxxx",
        database="smart_fridge"
    )


def add_item(name, quantity, category):
    conn = connect_db()
    cursor = conn.cursor()

    sql = """
        INSERT INTO inventory (item_name, quantity, category)
        VALUES (%s, %s, %s)
    """

    cursor.execute(sql, (name, quantity, category))
    conn.commit()

    print("Item added successfully!")

    cursor.close()
    conn.close()


def view_items():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM inventory")

    for item in cursor.fetchall():
        print(item)

    cursor.close()
    conn.close()


def remove_item(item_id):
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM inventory WHERE item_id = %s",
        (item_id,)
    )

    conn.commit()

    if cursor.rowcount > 0:
        print("Item removed successfully!")
    else:
        print("Item not found.")

    cursor.close()
    conn.close()


# Test the functions
if __name__ == "__main__":
    add_item("Tomato", 3, "Vegetable")
    view_items()
