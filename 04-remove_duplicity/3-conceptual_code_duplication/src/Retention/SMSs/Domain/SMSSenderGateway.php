<?php

declare(strict_types=1);

namespace CodelyTv\Retention\SMSs\Domain;

interface SMSSenderGateway
{
	public function send(WelcomeSMS $sms): void;
}