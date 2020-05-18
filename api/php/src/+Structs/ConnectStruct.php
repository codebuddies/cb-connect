<?php
declare(strict_types=1);
/**
 * Created by PhpStorm.
 * User: Julius Alvarado
 * Date: 5/16/2020
 * Time: 6:13 AM
 */

namespace CodeBuddies;


class ConnectStruct
{
    public string $localHost;
    public string $localUser;
    public string $localPass;
    public string $localDb;
    public string $proHost;
    public string $proUser;
    public string $proPass;
    public string $proDb;
    
    public function __construct(array $c) {
        $this->localHost = $c['local']['host'];
        $this->localUser = $c['local']['user'];
        $this->localPass = $c['local']['pass'];
        $this->localDb = $c['local']['db'];
        $this->proHost = $c['production']['host'];
        $this->proUser = $c['production']['user'];
        $this->proPass = $c['production']['pass'];
        $this->proDb = $c['production']['db'];
    }
}