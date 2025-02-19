# Usa PHP 8.2 con FPM
FROM php:8.2-fpm

# Installa dipendenze necessarie
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql gd

# Installa Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Imposta la working directory
WORKDIR /var/www

RUN mkdir -p /var/www/database && touch /var/www/database/database.sqlite


# Copia i file del progetto
COPY . .

# Installa le dipendenze di PHP
RUN composer install --no-dev --optimize-autoloader

# Assegna i permessi corretti a storage e cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Installa Node.js 20 e npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install

# Esponi la porta 8000 per Laravel
EXPOSE 8000

# Avvia Laravel (puoi cambiarlo se usi nginx o altro)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
