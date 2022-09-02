{
	"info": {
		"_postman_id": "6e47c1c9-e44b-49fe-bb61-d91f9c42d239",
		"name": "peerdep-api",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "15891105"
	},
	"item": [
		{
			"name": "user-service",
			"item": [
				{
					"name": "Create user",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"username\" : \"test\",\r\n    \"password\" : \"test\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/user/signup",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"user",
								"signup"
							]
						}
					},
					"response": []
				},
				{
					"name": "Login user",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"username\" : \"test\",\n    \"password\" : \"test\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/user/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"user",
								"login"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}