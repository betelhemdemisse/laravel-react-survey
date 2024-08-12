<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /*
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // Add your Artisan commands here
    ];

    /*
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Define your command schedule here
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(DIR.'/Commands');

        require base_path('routes/console.php');
    }
}