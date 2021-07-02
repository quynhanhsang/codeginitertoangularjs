<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Role extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'      => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'roleName' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'creatTime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'editTime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'isDelete' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ],
            'isDefault' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ],
            'permissionID' => [
                'type' => 'TEXT',
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('role');
    }

    public function down()
    {
        $this->forge->dropTable('role');
    }
}
