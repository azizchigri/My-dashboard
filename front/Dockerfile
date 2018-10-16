FROM phpearth/php:7.1-apache
EXPOSE 8080
COPY ./front/*/*/* /usr/local/apache2/htdocs/
COPY ./front/*/*/* /var/www/
ADD ./front/config/httpd.conf /usr/local/apache2/conf/httpd.conf
