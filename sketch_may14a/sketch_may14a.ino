
#include <SPI.h>
#include <Ethernet.h>
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };


EthernetClient client;

int    HTTP_PORT   = 3000;
String HTTP_METHOD = "GET";
char   HOST_NAME[] = "localhost";
String PATH_NAME   = "/create-notification"; //создание таблицы
String PATH_NAME2   = "/notification1"; //заполнение таблицы
 
void setup() {
  Serial.begin(9600);
  if (Ethernet.begin(mac) == 0) {
  Serial.println("Failed to configure Ethernet using DHCP");
  Ethernet.begin(mac);
  }
  delay(1000);
}
//---------------------------------variables to send-------------------------------------
// String conditionString = "?condition=located+high+temperature&desc=Sensor+1%2CSensor+4%3A+high+temperature&sensor1=30&sensor2=15%2E5&sensor3=14&sensor4=31&sensor5=16&sensor6=15&sensor7=14%2E5";
 
char data[] = "{cond:'located high temperature',desc:'Sensor 1,Sensor 4:high temperature',sensors:{sensor1: 30, sensor2: 15.5, sensor3: 14, sensor4: 31, sensor5: 16, sensor6: 15, sensor7: 14.5}}";
// char desc[] = "Sensor 1, Sensor 4: high temperature";
// int sensor1 = 30;
// int sensor2 = 15.5;
// int sensor3 = 14;
// int sensor4 = 31;
// int sensor5 = 16;
// int sensor6 = 15;
// int sensor7 = 14.5;
 //------------------------------------------------------------------------------
 
void loop(){
  Sending_To_mydatabase(); 
  delay(30000);
}
 
 
  void Sending_To_mydatabase()
 {
   if(client.connect(HOST_NAME, HTTP_PORT)) {
    Serial.println("Connected to server");
    
    client.println(HTTP_METHOD + " " + PATH_NAME + " HTTP/1.1"); //создание таблицы
    
    client.println(HTTP_METHOD + " " + PATH_NAME2 + data + " HTTP/1.1");//заполнение таблицы
    client.println("Host: " + String(HOST_NAME));
    client.println("Connection: close");
    client.println();
  } else {
    Serial.println("connection failed");
  }
 }
