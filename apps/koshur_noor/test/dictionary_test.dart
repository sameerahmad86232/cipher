import 'package:flutter_test/flutter_test.dart';
import 'package:koshur_noor/dictionary_screen.dart';

void main() {
  const entries = [
    DictionaryEntry(
      kashmiri: 'کِتاب',
      english: 'book',
      transliteration: 'kitab',
    ),
    DictionaryEntry(kashmiri: 'ناو', english: 'name', transliteration: 'naav'),
    DictionaryEntry(
      kashmiri: 'کِتابہٕ',
      english: 'books',
      transliteration: 'kitabah',
    ),
  ];

  test('Dictionary search ranks exact and folded Kashmiri matches first', () {
    expect(searchDictionary(entries, 'کِتاب').first.english, 'book');
    expect(searchDictionary(entries, 'کتاب').first.english, 'book');
  });

  test('Dictionary searches English and romanization', () {
    expect(searchDictionary(entries, 'book').map((e) => e.english), [
      'book',
      'books',
    ]);
    expect(searchDictionary(entries, 'naav').single.kashmiri, 'ناو');
  });
}
