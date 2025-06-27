<?php
// =============================================================================
// DENTALIST - SECURITY INDEX (PHP)
// =============================================================================
// This file provides additional security layer for PHP servers
// Redirects all requests to index.html except allowed files

$allowed_extensions = ['html', 'css', 'js', 'jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'woff', 'woff2', 'ttf', 'eot'];
$allowed_files = ['index.html', 'style.css', 'sitemap.xml'];

$request_uri = $_SERVER['REQUEST_URI'];
$path_info = pathinfo($request_uri);

// Check if requesting a specific file
if (isset($path_info['extension'])) {
    $extension = strtolower($path_info['extension']);
    $filename = basename($request_uri);
    
    // Block access to sensitive files
    $blocked_files = ['config.js', 'script.js', 'sw.js', '.htaccess'];
    $blocked_extensions = ['md', 'txt', 'log', 'json'];
    
    if (in_array($filename, $blocked_files) || in_array($extension, $blocked_extensions)) {
        header("HTTP/1.1 403 Forbidden");
        exit("Access Denied");
    }
    
    // Allow specific extensions
    if (!in_array($extension, $allowed_extensions)) {
        header("HTTP/1.1 403 Forbidden");
        exit("Access Denied");
    }
}

// Block access to docs directory
if (strpos($request_uri, '/docs/') !== false) {
    header("HTTP/1.1 403 Forbidden");
    exit("Access Denied");
}

// If requesting root or html file, serve index.html
if ($request_uri == '/' || $request_uri == '/index.html' || pathinfo($request_uri, PATHINFO_EXTENSION) == 'html') {
    readfile('index.html');
    exit;
}

// For other requests, check if file exists and is allowed
$file_path = '.' . $request_uri;
if (file_exists($file_path) && is_file($file_path)) {
    $filename = basename($file_path);
    $extension = pathinfo($file_path, PATHINFO_EXTENSION);
    
    if (in_array($extension, $allowed_extensions) || in_array($filename, $allowed_files)) {
        // Serve the file with appropriate content type
        $mime_types = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject'
        ];
        
        if (isset($mime_types[$extension])) {
            header('Content-Type: ' . $mime_types[$extension]);
        }
        
        readfile($file_path);
        exit;
    }
}

// Default: redirect to index.html
header("Location: /index.html");
exit;
?>
