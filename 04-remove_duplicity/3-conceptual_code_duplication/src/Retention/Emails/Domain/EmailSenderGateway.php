<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Emails\Domain;

interface EmailSenderGateway
{
	public function send(WelcomeEmail $email): void;
}
