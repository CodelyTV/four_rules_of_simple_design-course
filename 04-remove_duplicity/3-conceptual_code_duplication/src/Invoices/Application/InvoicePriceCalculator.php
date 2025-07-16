<?php

namespace CodelyTv\Invoices\Application;

use CodelyTv\invoices\domain\InvoiceLine;

final readonly class InvoicePriceCalculator
{
	/** @param InvoiceLine[] $products */
	public function computeInvoiceAmount(array $products): float
	{
		$sum = 0;
		foreach ($products as $product) {
			$sum += $product->cost * $product->amount;
		}

		$reduction = $sum > 100 ? $sum * 0.1 : 0;
		$vat = ($sum - $reduction) * 0.21;

		return $sum - $reduction + $vat;
	}
}
