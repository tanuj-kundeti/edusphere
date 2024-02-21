from edusphere.models import UserPersonalDetails, ChatModel, Students, Professors
from django.contrib.auth.models import User
from django.db.models import Q


class Utilities():
    def getTypeOfUser(self, id):
        print(id)
        u = UserPersonalDetails.objects.get(userId = id)
        return str(u.userType)
    

    def getErrorUsers(self):
        students = UserPersonalDetails.objects.filter(userType = "S")
        print("Students Users - S")
        for s in students:
            try:
                sobj = Students.objects.get(userId = s.userId)
                sobjw = sobj.id
            except:
                print(s.userId.username)
        print("---------------------------------")
        print("Instructor Users - I")
        instructors = UserPersonalDetails.objects.filter(userType = "I")

        for i in instructors:
            try:
                iobj = Professors.objects.get(userId = i.userId)
                iobjw = iobj.id
            except:
                print(i.userId.username)

        print("---------------------------------")

        return 0



    
    def getChatThreadId(self, userId1, userId2):
        try:
            chats = ChatModel.objects.filter(userId1 = userId1, userId2= userId2).order_by("id")
            if len(chats) > 0:
                return chats[0].threadId, chats[0].userId1, chats[0].userId2
            else:
                chats1 = ChatModel.objects.filter(userId1 = userId2, userId2= userId1).order_by("id")
                if len(chats1) > 0:
                    return chats1[0].threadId, chats1[0].userId1, chats1[0].userId2
                else:
                    return "-1", 0, 0
        except:
            try:
                chats2 = ChatModel.objects.filter(userId1 = userId2, userId2= userId1).order_by("id")
                if len(chats2) > 0:
                    return chats2[0].threadId, chats2[0].userId1, chats2[0].userId2
            except:
                return "-1", 0, 0
            return "-1", 0, 0
        

    def getThreadIdForUser(self, userId):
        try:
            chats1 = ChatModel.objects.filter(userId1 = userId).values_list('threadId', flat=True)
            chats2 = ChatModel.objects.filter(userId2 = userId).values_list('threadId', flat=True)
            
            threadIds = list(chats1) + list(chats2)

            return list(set(threadIds))
        except:
            return []


    def getChatUsersInvolved(self, userId, threads):
        try:
            output = []
            for t in threads:
                try:
                    c = ChatModel.objects.get(id = int(t))
                    obj = {}
                    obj["threadId"] = int(t)
                    if c.userId1.id == userId:
                        obj["otherUserId"] = c.userId2.id
                        obj["otherUserName"] = c.userId2.username
                    elif c.userId2.id == userId:
                        obj["otherUserId"] = c.userId1.id
                        obj["otherUserName"] = c.userId1.username
                    output.append(obj)
                except:
                    pass
            return output
        except:
            return []
        

    def getChatData(self, userId, threads):
        try:
            output = []
            connectedUsers = []
            for t in threads:
                obj = {}
                obj["userId"] = userId
                obj["threadId"] = int(t)
                try:
                    chatsData = []
                    chats = ChatModel.objects.filter(threadId = str(t)).order_by("id")
                    userInfoObj = Utilities().getOtherUserDetails(userId, chats[0].userId1.id,chats[0].userId2.id, chats[0].messageSenderId)
                    obj["senderName"] = userInfoObj["senderName"]
                    obj["receiverName"] = userInfoObj["receiverName"]
                    obj["senderUsername"] = userInfoObj["senderUsername"]
                    obj["receiveUsername"] = userInfoObj["receiveUsername"]
                    obj["status"] = userInfoObj["status"]
                    connectedUsers.append(userInfoObj["receiveUsername"])
                    obj["otherUserId"] = userInfoObj["otherUserId"]
                    obj["otherUserType"] = userInfoObj["otherUserType"]


                    for c in chats:
                        chatObj = {}
                        chatObj["chatId"] = c.id
                        chatObj["userId1"] = c.userId1.id
                        chatObj["userId2"] = c.userId2.id
                        chatObj["messageSenderId"] = int(c.messageSenderId)
                        chatObj["message"] = c.message
                        if userId == int(c.messageSenderId):
                            chatObj["messageSenderName"] =  obj["senderName"]
                        else:
                            chatObj["messageSenderName"] = obj["receiverName"]
                        chatObj["messageDateTime"] = c.messageDateTime.strftime("%m/%d/%Y %H:%M")
                        chatsData.append(chatObj)
                    obj["chats"] = chatsData
                    output.append(obj)
                except Exception as ex:
                    obj["Exception"] = ex
                    output.append(obj)
            return output, connectedUsers
        except:
            return output, connectedUsers

    def getAllOtherUsers(self, uid, data, connectedUsers):

        users = list(User.objects.filter(~Q(username__in=connectedUsers)).values_list("id",flat=True))
        sender = UserPersonalDetails.objects.get(userId__id = uid)
        ups = UserPersonalDetails.objects.filter(userId__id__in = users, userType__in=['s','S','i','I'])

        for u in ups:
            if u.userId == uid:
                continue
            receiverUserName = u.userId.username
            receiverFullName = str(u.firstName) + " " +str(u.lastName)
            senderUsername = str(sender.firstName) + " " +str(sender.lastName)
            obj = {}
            obj["userId"] = uid
            obj["threadId"] = -1
            obj["senderName"] = sender.userId.username
            obj["receiverName"] =   receiverFullName[:15]
            obj["senderUsername"] = senderUsername[:15]
            obj["receiveUsername"] = receiverUserName
            obj["messageSender"] = senderUsername
            obj["otherUserId"] = u.userId.id
            obj["otherUserType"] = u.userType.lower()
            obj["status"] = 'offline'
            obj["chats"] = []
            data.append(obj)

        return data


    def getOtherUserDetails(self, senderId, userId1, userId2, messageSenderId):
        obj = {}
        u1 = UserPersonalDetails.objects.get(userId__id = userId1)
        u2 = UserPersonalDetails.objects.get(userId__id = userId2)
        messageSender = UserPersonalDetails.objects.get(userId__id = int(messageSenderId))
        if senderId == userId1:
            obj["senderName"] = str(u1.firstName) +" "+ str(u1.lastName)
            obj["receiverName"] = str(u2.firstName) +" "+ str(u2.lastName)
            obj["senderUsername"] = u1.userId.username
            obj["receiveUsername"] = u2.userId.username
            obj["otherUserId"] = u2.userId.id
            obj["otherUserType"] = u2.userType.lower()
            obj["messageSender"] = str(messageSender.firstName) +" "+ str(messageSender.lastName)


            if u2.lastLogoutDateTime and u2.lastLoginDateTime:
                if u2.lastLogoutDateTime > u2.lastLoginDateTime:
                    obj["status"] = "offline"
                else:
                    obj["status"] = "online"
            else:
                obj["status"] = "offline"
        
        elif senderId == userId2:
            obj["senderName"] = str(u2.firstName) +" "+ str(u2.lastName)
            obj["receiverName"] = str(u1.firstName) +" "+ str(u1.lastName)
            obj["senderUsername"] = u2.userId.username
            obj["receiveUsername"] = u1.userId.username
            obj["otherUserId"] = u1.userId.id
            obj["otherUserType"] = u1.userType.lower()
            obj["messageSender"] = str(messageSender.firstName) +" "+ str(messageSender.lastName)


            if u1.lastLogoutDateTime and u1.lastLoginDateTime:
                if u1.lastLogoutDateTime > u1.lastLoginDateTime:
                    obj["status"] = "offline"
                else:
                    obj["status"] = "online"
            else:
                obj["status"] = "offline"

        return obj
