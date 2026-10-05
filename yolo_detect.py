from ultralytics import YOLO
import cv2

# Load pretrained YOLO model
model = YOLO("yolo11n.pt")

# Open webcam
camera = cv2.VideoCapture(0)

while True:
    ret, frame = camera.read()

    if not ret:
        print("Could not read camera")
        break

    # Run YOLO
    results = model(frame)

    # Draw detections
    annotated_frame = results[0].plot()

    cv2.imshow("YOLO Detection", annotated_frame)

    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()