<?php

declare(strict_types=1);

namespace CodelyTv\Retention\Pushes\Domain;

interface PushSenderGateway
{
	public function send(WelcomePush $push): void;
}