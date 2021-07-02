<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Permission extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'permissionName' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'permissionKey' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'parentId'          => [
                'type'           => 'INT',
                'unsigned'       => false,
                'auto_increment' => false,
                'null' => true,
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
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('permission');
    }

    public function down()
    {
        $this->forge->dropTable('permission');
    }
}
