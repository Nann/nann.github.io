---
layout: post
title: "Multiple SSH Keys Settings"
thumbnail: "../assets/img/posts/2017/09/nann-multiple-ssh-keys-settings-feature-img.png"
date: 2017-09-06
---

![Multiple SSH Keys Settings]({{ site.url }}/assets/img/posts/2017/09/nann-multiple-ssh-keys-settings-feature-img.png)

ปัจจุบันหากเป็น ***Developer*** ไม่มีใครที่ไม่รู้จัก ***Git*** อย่างแน่นอน เพราะเป็น ***Version Control*** ที่ทำให้ชีวิตของ Developer นั้นดี๊ดี ไม่ต้องมากังวลเวลาโค้ดพังแล้วจะเอาตัวที่ไม่พังมาจากไหน และยังลดปัญหาการ ***Backup*** ไฟล์ได้อีกด้วย

ผมเริ่มต้นการใช้งาน Git เมื่อประมาณต้นเดือนมีนาคม 2560 ตอนนั้นทำตามเอกสารเลยผลที่ออกจึงเป็นแบบนี้

![First Use Git]({{ site.url }}/assets/img/posts/2017/09/nann-first-use-git.jpg)

จำได้ว่า ***Username*** แรกตอนสมัครคือ ***Nannchalermchai*** แต่อยากใช้ชื่อสั้น ๆ ว่า ***Nann*** แต่ใช้ไม่ได้เพราะมีคนใช้อยู่แล้ว จึงตั้ง ***user.name*** เอาไว้ว่า ***Nann*** พอใช้ไปสักพักก็เริ่มเปลี่ยนรูปประจำตัว แล้วพบว่าที่เคย ***Commit*** ไปไม่เปลี่ยนรูปประจำตัวให้ เลยทำให้รู้ว่าควรตั้งค่า ***user.name*** ตาม ***Username*** ของเราไม่ใช่ ***Full Name*** อะไรก็ได้

ต่อมาก็เริ่มจากการเพิ่มประสบการณ์การใช้งาน ***Git*** โดยการใช้งาน ***Git มากกว่า 1 บัญชี*** เพราะ Git มีเครื่องมือให้เล่นมากมาย จึงอยากมีบัญชีใช้งาน 2 บัญชีคือ บัญชีหลักใช้ชื่อว่า ***Nann*** บัญชีรองใช้ชื่อว่า ***Nanndev*** บัญชีหลักมอบหมายงานให้บัญชีรองทำงาน เมื่อบัญชีรองทำงานเสร็จให้ ***Push*** เข้า ***Branch Develop*** ห้าม ***Push*** เข้า ***Master*** โดยตรง

[nann.github.io](https://nann.github.io/) จะเป็น Repository ที่ผมเอาหัดเล่นเครื่องมือต่าง ๆ ของ Github ส่วน Respository อื่น ๆ ก็ Push เข้า Master ตรง ๆ เลย เพราะทำงานคนเดียว และการทำงานคนเดียวยังไงก็ไม่เท่ากับประสบการณ์การใช้งานร่วมกับทีมงานจริง ประสบการณ์จริง

***เมื่อมีบัญชี Github มากกว่า 1 บัญชี*** เริ่มพบปัญหาในการยืนยันตัวตนด้วย ***SSH Keys*** ผมจึงสอบถามผู้เชี่ยวชาญและมากประสบการณ์ผ่าน ***Facebook Group*** ที่ชื่อว่า ***“[Gitฮับ](https://www.facebook.com/groups/440497309296387/permalink/1643574605655312/)”***  จึงได้คำตอบและแนวทางมาซึ่งก็คือ

## Multiple SSH Keys settings
วิธีนี้นั้นแสนจะง่ายดายเหลือเกินคือ ตอนที่เรา ***Gen SSH Keys*** นั้นก็แยกคนละบัญชีไปเลย ตัวอย่าง ***~/.ssh/id_rsa_nann*** หรือ ***~/.ssh/id_rsa_nanndev*** เพราะในตอนที่เราจะเก็บไฟล์ระบบถามอยู่แล้วว่าต้องการเก็บไว้ที่ไหน ***Enter file in which to save the key (//.ssh/id_rsa):*** ผมลืมขั้นตอนนี้บ่อยมากกด Enter รัว ๆ เลย ตอนหัดใช้ Git T^T

## วิธีแก้?
สามารถระบุไปตั้งแต่ตอนพิมพ์คำสั่ง ***Gen SSH Keys*** ได้เลยครับ ด้วยการเพิ่มคำสั่งไปอีกนิดหน่อยนั่นก็คือ ***-f /path/to/key*** จะได้คำสั่งเต็มเป็นแบบนี้

```
$ ssh-keygen -t rsa -C "your_email@youremail.com" -f ~/.ssh/id_rsa_nann
```

 สำหรับบัญชีแรก

```
$ ssh-keygen -t rsa -C "your_email@youremail.com" -f ~/.ssh/id_rsa_nanndev
```

สำหรับบัญชีที่สอง

## ตั้งค่า Host สำหรับแต่ละบัญชี
เมื่อเรา ***Gen SSH Keys*** แยกกันแต่ละบัญชีแล้ว ต่อไปก็ตั้งค่าให้ ***Git Hosting Services*** เรียก ***SSH Keys*** ของแต่ละบัญชี

เริ่มจากการไปยัง ***Folder*** ของ ***.ssh*** ก่อน ด้วยคำสั่ง
```
$ cd ~/.ssh
```

จากนั้นสร้างไฟล์ ***config*** ด้วยคำสั่ง
```
$ touch config
```

สุดท้ายเปิดไฟล์ ***config*** ผ่านโปรแกรม ***Atom*** ด้วยคำสั่ง
```
$ atom -a config
```

ผมมีบัญชีใช้งานประมาณ 3 บัญชี หน้าตาก็จะออกมาประมาณนี้

```
#Nann account
Host github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa

#Nanndev account
Host github.com-nanndev
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa_nanndev

#Nannchili account
Host bitbucket.org-nannchili
	HostName bitbucket.org
	User git
	IdentityFile ~/.ssh/id_rsa_nannchili
```

สำหรับขั้นตอนเปิดไฟล์ ***config*** ด้วยโปรแกรม ***atom*** หากยังไม่ได้ตั้งค่า ***core.editor*** สามารถทำตามคำแนะนำตามลิ้งด้านล่างนี้ได้เลยครับ

```
https://help.github.com/articles/associating-text-editors-with-git/
```


## ใช้งานอย่างไร?
เมื่อต้องการใช้บัญชีไหนก็ให้ระบุตาม Host ที่เราได้ตั้งค่าเอาไว้ได้เลยครับ รูปแบบคำสั่งก็จะออกมาประมาณนี้ ยกตัวอย่างเช่น เราต้องการ Clone

```
$ git clone git@github.com-nanndev:Nann/nann.github.io.git
```

***เท่านี้เราก็ไม่ต้อง Gen SSH Keys ใหม่ทุกครั้งที่ต้องสลับบัญชีแล้วครับ***
