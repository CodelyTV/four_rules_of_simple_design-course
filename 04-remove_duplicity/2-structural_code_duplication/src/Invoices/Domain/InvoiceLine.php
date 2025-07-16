<?php

namespace CodelyTv\Invoices\Domain;

final readonly class InvoiceLine
{
	public function __construct(
		public string $productName,
		public float $cost,
		public int $amount
	)
	{ }
}
