<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test512@example.com',
            'password' => 'password123@',
            'password_confirmation' => 'password123@',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'token',
        ]);
        $this->assertDatabaseHas('users', [
            'email' => 'test512@example.com',
        ]);
    }

    public function test_login(): void
    {
        // Create a user with plain text password
        $user = User::factory()->create([
            'password' => bcrypt('password123@'), // Use bcrypt here
        ]);

        // Log in with plain text password
        $response = $this->postJson('/api/login', [
            'email' => $user->email, // Use the email of the created user
            'password' => 'password123@', // Use plain text password here
        ]);

        $response->assertStatus(200);
        // Add further assertions if necessary, e.g. checking for a token
        $response->assertJsonStructure([
            'token',
        ]);
    }
}