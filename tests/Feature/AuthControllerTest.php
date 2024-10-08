<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    public function test_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test20@example.com',
            'password' => 'password123@',
            'password_confirmation' => 'password123@',
        ]);
        // In your test method

        $response->assertStatus(200);
        // $response->assertJsonStructure([
        //     'token' => 'token',
        // ]);
        // $this->assertDatabaseHas('users', [
        //     'email' => 'test12@example.com',
        // ]);
    }
   
    public function test_login(): void 
    {
        // $user = \App\Models\User::factory()->create([
        //     'password' => bcrypt('password123@'),
        // ]);
        $response = $this->postJson('/api/login', [
            'email' => 'test8@example.com',
            'password' => bcrypt('password123@'),
        ]);
        $response->assertStatus(200);
      
    }
}