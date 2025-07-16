<?php

declare(strict_types=1);

namespace CodelyTv\Controller;

use CodelyTv\Admin;
use CodelyTv\AdminRepository;
use CodelyTv\User;
use CodelyTv\UserRepository;
use InvalidArgumentException;

final readonly class UsersController
{
	public function __construct(private UserRepository $userRepository, private AdminRepository $adminRepository) {}

	public function usersPost(string $username, string $email, string $name, string $surname): void
	{
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			throw new InvalidArgumentException('Invalid email format');
		}

		$user = new User($username, $email, $name, $surname);

		$this->userRepository->save($user);
	}

	public function adminsPost(string $username, string $email, string $adminCode): void
	{
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			throw new InvalidArgumentException('Invalid email format');
		}

		$admin = new Admin($username, $email, $adminCode);

		$this->adminRepository->save($admin);
	}
}
