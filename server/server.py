from flask import Flask, request, jsonify
import utils

app = Flask(__name__)

@app.route('/About')
def About():
    return("Bangalore Real-Estate Prices Predition Flask App Made by Yukti Khurana")

# to display various house locations in bangalore to choose from 
@app.route('/get_house_locations',methods=['GET'])
def get_house_locations():
    response = jsonify({
        'locations': utils.get_house_locations()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

# for prediction of house price
@app.route('/predict_house_price', methods=['GET', 'POST'])
def predict_house_price():
    location = request.form['location']
    sqft = float(request.form['sqft'])
    size_bhk = int(request.form['size_bhk'])
    bath = int(request.form['bath'])
    response = jsonify({
        'predicted_price': utils.get_predicted_price(location, sqft, size_bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Real-Estate Prices Prediction...")
    utils.load_model_artifacts()
    app.run()


