<?php

declare(strict_types=1);

namespace CodelyTv\Ecommerce\Invoices\Domain;

final readonly class InvoiceLine
{
	public function __construct(
		public string $productName,
		public float $cost,
		public int $amount
	) {}
}
