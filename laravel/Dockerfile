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

# Copy Laravel framework files required for composer install
COPY . .

# Ensure artisan file is executable
RUN chmod +x artisan

RUN composer update --ignore-platform-req=ext-xml

# Install Laravel dependencies
RUN composer install --no-interaction --no-progress --prefer-dist

# Copy the rest of the application
COPY . .

# Set correct permissions for Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/.

# Ensure SQLite database file exists
RUN mkdir -p database && touch database/database.sqlite && chmod 777 database/database.sqlite

# Expose port 8000 and start Laravel's built-in server
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
