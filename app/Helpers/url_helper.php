<?php

/**
 * This file is part of the CodeIgniter 4 framework.
 *
 * (c) CodeIgniter Foundation <admin@codeigniter.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\URI;
use CodeIgniter\Router\Exceptions\RouterException;
use Config\App;
use Config\Services;

/**
 * CodeIgniter URL Helpers
 */
//--------------------------------------------------------------------

if (! function_exists('base_admin_url')) {
    /**
     * Returns the base URL as defined by the App config.
     * Base URLs are trimmed site URLs without the index page.
     *
     * @param mixed  $relativePath URI string or array of URI segments
     * @param string $scheme
     *
     * @return string
     */
    function base_admin_url($relativePath = '', string $scheme = null): string
    {
        $config            = clone config('App');
        return $config->baseAdminURL;
    }
}
