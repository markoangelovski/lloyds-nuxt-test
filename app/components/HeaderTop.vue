<script setup lang="ts">
const address = {
    line1: 'Šijanska cesta 4',
    line2: '52100 Pula, Hrvatska'
}

const phone = '+385 (52) 356 500'
const email = 'brioni@brioni.hr'
</script>

<template>
    <header
        class="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <!-- Top Bar -->
        <div class="flex items-center justify-end px-4 py-2 text-sm gap-4">
            <!-- Language Switcher -->
            <div class="flex items-center gap-2">
                <!-- Placeholder Flag 1 -->
                <div class="w-6 h-4">
                    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <rect width="100%" height="100%" fill="#e5e7eb" />
                        <line x1="0" y1="0" x2="60" y2="40" stroke="#9ca3af" stroke-width="4" />
                        <line x1="60" y1="0" x2="0" y2="40" stroke="#9ca3af" stroke-width="4" />
                    </svg>
                </div>

                <!-- Placeholder Flag 2 -->
                <div class="w-6 h-4">
                    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                        <rect width="100%" height="100%" fill="#e5e7eb" />
                        <line x1="0" y1="0" x2="60" y2="40" stroke="#9ca3af" stroke-width="4" />
                        <line x1="60" y1="0" x2="0" y2="40" stroke="#9ca3af" stroke-width="4" />
                    </svg>
                </div>
            </div>

            <!-- Social Icons -->
            <div class="flex items-center gap-3">
                <Icon name="mdi:facebook" class="w-5 h-5 cursor-pointer" />
                <Icon name="mdi:instagram" class="w-5 h-5 cursor-pointer" />
                <Icon name="mdi:youtube" class="w-5 h-5 cursor-pointer" />
            </div>
        </div>

        <!-- Main Header Content -->
        <div class="flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-6 md:gap-0">
            <!-- Logo Placeholder -->
            <div class="flex-shrink-0 w-40 h-16">
                <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                    <rect width="100%" height="100%" fill="#e5e7eb" />
                    <line x1="0" y1="0" x2="200" y2="80" stroke="#9ca3af" stroke-width="6" />
                    <line x1="200" y1="0" x2="0" y2="80" stroke="#9ca3af" stroke-width="6" />
                </svg>
            </div>

            <!-- Address -->
            <div class="flex items-center gap-3 text-sm text-center md:text-left">
                <Icon name="mdi:home-outline" class="w-6 h-6 text-red-500" />
                <div>
                    <p class="font-semibold">{{ address.line1 }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ address.line2 }}</p>
                </div>
            </div>

            <!-- Contact -->
            <div class="flex items-center gap-3 text-sm text-center md:text-left">
                <Icon name="mdi:phone" class="w-6 h-6 text-red-500" />
                <div>
                    <p class="font-semibold">{{ phone }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ email }}</p>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped></style>
