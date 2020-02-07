# README

# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|mail|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :massages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|text|text||
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :massages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|boby|text|null: false|
|user|references|foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
