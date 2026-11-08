<?php
/**
 * Young Wombs Trauma Centre - Yo! Payments Instant Payment Notification (IPN Callback)
 * Endpoint URL: https://yourdomain.com/api/yo-ipn.php
 * Yo! Payments posts transaction status updates here asynchronously after customer enters PIN.
 */

header('Content-Type: text/plain; charset=utf-8');

// Read raw POST data from Yo! Payments
$rawBody = file_get_contents('php://input');
$postData = $_POST;

// Log IPN notification locally to ipn_log.txt for accounting & audits
$logEntry = "[" . date('Y-m-d H:i:s') . "] IPN Notification Received:\n";
$logEntry .= "Raw Body: " . $rawBody . "\n";
$logEntry .= "POST Data: " . print_r($postData, true) . "\n";
$logEntry .= "---------------------------------------------------------\n";

@file_put_contents(__DIR__ . '/ipn_log.txt', $logEntry, FILE_APPEND);

// Return HTTP 200 OK to Yo! Payments acknowledging receipt
http_response_code(200);
echo "OK";
