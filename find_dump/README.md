## Find Dump

- Listens to new document writes on the `fingerprints` collection in Firestore
- Parses the document to extract the set of data points
- Converts the data points into a JSON object
- Dumps it onto the exposed machine learning [API](http://maps.goflo.in)