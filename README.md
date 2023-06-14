# 1. Các bước cài đặt docker trên hệ điều hành ubuntu

## Bước 1: Cập nhật hệ thống
Tiến hành cập nhật các package đã cài đặt trên ubuntu
```
    sudo apt update -y && apt upgrade -y
```

## Bước 2: Download và cài đặt docker
Sử dụng lệnh
```
    sudo apt install docker.io
```
## Bước 3: Khởi chạy docker
Dòng lệnh bên dưới sẽ kích hoạt docker tự động khởi chạy khi hệ thống được reboot.
```
    sudo systemctl enable --now docker
```

Để disable tự động khởi chạy docker, bạn có thể sử dụng câu lệnh sau
```
    sudo systemctl disable --now docker
```

## Bước 4: Thiết lập đặc quyền
Thiết lập đặc quyền truy cập docker cho bất kỳ user nào.
```
    sudo usermod -aG docker username && newgrp docker
```
Thay username bằng tên user của bạn

## Bước 5: Kiểm tra phiên bản docker đang sử dụng
Để kiểm tra phiên bản docker hiện tại, bạn có thể sử dụng câu lệnh sau
```
    docker --version
```

## Bước 6: Test thử docker
Để test docker có chạy hay không bằng cách chạy câu lệnh sau – ở đây nó sẽ pull về và chạy container hello-world
```
    docker run hello-world
```

## Bước 7: Sử dụng lệnh Docker để build container
Xem các thông tin về Docker
```
    docker info
```

Build Docker image
```
    docker build . -t [tên tag image]
```

Chạy image đã build
```
    docker run -itd -p [Cổng của dự án expose ra]:[cổng ánh xạ đến container] [name:tag] 
```

Xem các image đã build
```
    docker image ls
```

Check container đang chạy
```
    docker ps -a
```

Kiểm tra logs trong quá trình chạy container
```
    docker logs 
```

# 2. Triển khai ứng dụng tự động bằng jenkin

## Bước 1: Cài đặt jenkins trên máy local sử dụng docker

Chạy lệnh sau để cài đặt docker
```
    docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v /Users/vunguyen/Desktop/jenkins:/var/jenkins_home jenkins/jenkins:lts
```
Thay `/Users/vunguyen/Desktop/jenkins` bằng thư mục jenkins trên máy của bạn

## Bước 2: Thiết lập jenkins
1. Truy cập cổng 8080 ở localhost để thực hiện thiết lập

![Picture1](https://github.com/vunt201002/booking-pttm/assets/81251420/d0ea46b7-d0b3-47c8-9bcb-b37899607e4e)

2. Lựa chọn install plugin theo suggeste và Jenkins sẽ bắt đầu tải về và cài đặt.  

![Picture2](https://github.com/vunt201002/booking-pttm/assets/81251420/9422581b-d07b-4171-8232-9a37d8b056c3)

3. Sau khi hoàn tất việc cài đặt , Jenkins sẽ yêu cầu thiết lập tài khoản

![Picture3](https://github.com/vunt201002/booking-pttm/assets/81251420/a576ac74-eaaf-4d28-9bca-090ce3842803)

## Bước 3: Expose cổng localhost của jenkins sử dụng ngrok

1. Cài đặt ngrok về máy, tham khảo thêm tại [đây](https://ngrok.com/)

2. Expose cổng 8080 ở localhost ra ngoài
```
    ngrok http 8080
```

## Bước 4: Thêm link jenkins đã expose ở bước trước vào webhook của github

## Bước 5: Tạo tài khoản jenkins

## Bước 6: Push code lên github và vào jenkins kiểm tra
