<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Category extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'target' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'description' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'image' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'parentId' => [
                'type' => 'INT',
                'constraint' => '11',
            ],
            'level' => [
                'type' => 'INT',
                'constraint' => '11',
            ],
            'seoTitle' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoAlias' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoKeywords' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoDescription' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'sortOrder' => [
                'type' => 'INT',
                'constraint' => '11',
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
        $this->forge->createTable('category');
    }

    public function down()
    {
        $this->forge->dropTable('category');
    }
}
