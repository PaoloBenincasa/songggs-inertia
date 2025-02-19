# Usa un'immagine ufficiale di PHP con supporto a Composer
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

# Copia i file del progetto
WORKDIR /var/www
COPY . .

# Installa le dipendenze di PHP
RUN composer install --no-dev --optimize-autoloader

# Installa Node.js, npm e Vite
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install

