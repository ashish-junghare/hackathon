Create table user 
(
    user_id int primary key auto_increment,
    full_name varchar(50),
    email varchar(30),
    password varchar(200),
    phone_no varchar(20),
    created_time DATETIME default CURRENT_TIMESTAMP,
    is_delete int default 0
);

Create table blog 
(
    blog_id int primary key auto_increment,
    title varchar(1000),
    content varchar(10000),
    created_time DATETIME default CURRENT_TIMESTAMP,
    user_id int,
    category_id int,
    foreign key(user_id) REFERENCES user(user_id),
    foreign key(category_id) REFERENCES category(category_id),
    is_delete int default 0
);

Create table category 
(
    category_id int primary key auto_increment,
    title varchar(1000),
    description varchar(3000),
    created_time DATETIME default CURRENT_TIMESTAMP,
    is_delete int default 0
);

insert into user (full_name,email,password ,phone_no) values('ashish','ash@gmail.com','test','9923347353');
insert into category (title,description) values('java','is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMak');

insert into blog (title,content,user_id ,category_id) values('lambda expression','is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution',1,1);
