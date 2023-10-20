import cv2
import imutils

def tracker(source):
    trackalgo=cv2.TrackerCSRT_create()
    #here unnaku puditha modelai define seiyavum!
    video=cv2.VideoCapture(source)
    read_stat,frame=video.read()
    frame=imutils.resize(frame,width=720)
    dappa=cv2.selectROI(frame,False)
    trackalgo.init(frame,dappa)
    
    while True:
        read_stat,frame=video.read()
        frame=imutils.resize(frame,width=720)
        track_stat,dappa=trackalgo.update(frame)
        if track_stat:
            p1=(int(dappa[0]),int(dappa[1]))
            p2=(int(dappa[0]+dappa[2]),int(dappa[1]+dappa[3]))
            cv2.rectangle(frame,p1,p2,(0,255,0),3)
        cv2.imshow("Tracking",frame)
        key=cv2.waitKey(1) & 0xff
    

tracker("../tests/test1.mp4")
