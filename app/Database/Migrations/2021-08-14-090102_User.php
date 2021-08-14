<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class User extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'userName'       => [
                    'type'       => 'VARCHAR',
                    'constraint' => '100',
                    'null' => true,
            ],
            'passWord' => [
                    'type' => 'TEXT',
                    'null' => true,
            ],
            'level' => [
                    'type' => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => false,
            ],
            'imageSlug' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'tennantId' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'email' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '11',
            ],
            'name' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'surName' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'subName' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'creatTime' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
            'editTime' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
            'isDelete' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ],
            'roleID' => [
                'type' => 'TEXT',
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('user');
    }

    public function down()
    {
        $this->forge->dropTable('user');
    }
}
