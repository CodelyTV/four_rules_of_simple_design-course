<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Emails\Application\SendWelcomeEmail;

use CodelyTv\Retention\Emails\Domain\EmailSenderGateway;
use CodelyTv\Retention\Emails\Domain\WelcomeEmail;

final readonly class WelcomeEmailSender
{
	public function __construct(private EmailSenderGateway $sender) {}

	public function send(string $name, string $emailAddress): void
	{
		$email = new WelcomeEmail($emailAddress, $name);

		$this->sender->send($email);
	}
}
