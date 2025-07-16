<?php

namespace CodelyTv\Ecommerce\Orders\Application;

use CodelyTv\Ecommerce\Orders\Domain\OrderItem;

final readonly class OrderPriceCalculator
{
	/** @param OrderItem[] $items */
	public function calculateOrderTotal(array $items): float
	{
		$total = 0;
		foreach ($items as $item) {
			$total += $item->price * $item->quantity;
		}

		$discount = $total > 100 ? $total * 0.1 : 0;
		$tax = ($total - $discount) * 0.21;

		return $total - $discount + $tax;
	}
}
