## Find Dump

- Listens to new document writes on the `fingerprints` collection in Firestore
- Parses the document to extract the set of data points
- Parses and converts the data points into a JSON object, which is used as the body of the request
- POSTs it onto the exposed machine learning [API](http://maps.goflo.in)