#include <iostream>
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#define MAX_SIZE 5
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
struct msgq
{
	char msg[MAX_SIZE][100];
	int rear,front;
	
};

void initq(struct msgq *q)
{
	q->front=q->rear=-1;
}

int qfull(struct msgq q)
{
	return((q.rear==MAX_SIZE)?1:0);
}

int qempty(struct msgq q)
{
	return(((q.front==-1 && q.rear==-1) || (q.front>q.rear)?1:0));
}

int sender(struct msgq *q,char msg[100])
{
	if(!qfull(*q))
	{
		strcpy((q->msg[++(q->rear)]),msg);
		return 1;		
	}
	return 0;
}

void receiver(struct msgq *q)
{
	if(!qempty(*q))
	{

		printf("Message = %s ",q->msg[q->front]);
		(q->front)++;
	}
	else
	printf("\nThe meassage queue is empty!!\n");
}
int main(int argc, char** argv) {
	struct msgq mq;
	initq(&mq);
	int ch;
	while(1)
	{
	//	stdin.flush();
		printf("\nPress 1. To send message\nPress 2. to Receive message\nPress 3. to exit\n");
		scanf("%d",&ch);
		switch (ch)
		{
			case 1 :printf("\nEnter your message :: ");
					char msg[100]; 
					scanf("%c ",&msg);
					if(sender(&mq,msg))
					{
						printf("\nMessage sent sucessfully !!\n");
					}
					else printf("\nMessage not sent!!\n");
					break;
					
			case 2 :receiver(&mq);
					break;
			
			case 3 :exit(0);
					
		}		
	}
	return 0;
}
