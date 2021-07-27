<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SystemConfig extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'settingKey' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'settingType' => [
                'type' => 'INT',
                'null' => true,
                'constraint' => '200',
            ],
            'settingValue' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'description' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'tennantId' => [
                'type' => 'INT',
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
            'isActive' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('systemconfig');
    }

    public function down()
    {
        $this->forge->dropTable('systemconfig');
    }
}
