FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_sqlite

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . .

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html

# Install Laravel dependencies
RUN composer install --no-interaction --no-progress --prefer-dist

# Ensure SQLite database file exists
RUN touch database/database.sqlite && chmod 777 database/database.sqlite

# Expose port 8000 and start Laravel's built-in server
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
RUN php artisan migrate
