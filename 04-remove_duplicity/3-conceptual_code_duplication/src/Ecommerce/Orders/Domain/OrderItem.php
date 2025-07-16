<?php

namespace CodelyTv\Ecommerce\Orders\Domain;

final readonly class OrderItem
{
	public function __construct(
		public string $productId,
		public float $price,
		public int $quantity
	)
	{
	}
}
