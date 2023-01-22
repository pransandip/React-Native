import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const FAQ = () => {
  const [faqList, setFaqList] = useState([
    {
      heading: 'How do I find and book workers for a job/gig?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading:
        'I’ve booked a worker for a gig! Is there anything I need to do or prepare?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading: 'What do I do when a worker arrives for a gig?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading:
        'What happens if I need to cancel a gig where I have already booked a worker?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading: 'What jobs does WorkBriefly help businesses staff?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading: 'Where is WorkBriefly available?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
    {
      heading: 'Are workers WorkBriefly employees or independent contractors?',
      subHeading: 'Lorem Ipsum',
      content1: 'You apply for a gig > Business accepts > You’re booked!',
      content2: ' Business invites you for a gig > You accept > You’re booked!',
      bottomContent:
        'Lorem ipsum: Once you’re booked for a gig, please show up for the job on time at the specified location and report to the business’ point of contact. (This will be displayed under the job information)',
    },
  ]);

  return (
    <View style={styles.rootView}>
      {faqList.map((item, index) => {
        return (
          <View>
            <Collapse>
              <CollapseHeader>
                <View style={styles.headingView}>
                  <View style={{width: '80%'}}>
                    <Text style={styles.headingTxt}>{item.heading}</Text>
                  </View>

                  <Icon name="chevron-small-down" type="Entypo" />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.subHeadingView}>
                  <Text style={styles.collaspseTxt}>{item.subHeading}</Text>
                  <View style={styles.bodyView}>
                    <View style={styles.contentView}>
                      <Icon name="dot-single" type="Entypo" />
                      <Text style={styles.collaspseTxt}>{item.content1}</Text>
                    </View>
                    <View style={styles.contentView}>
                      <Icon name="dot-single" type="Entypo" />
                      <Text style={styles.collaspseTxt}>{item.content2}</Text>
                    </View>
                  </View>

                  <Text style={[styles.collaspseTxt, {lineHeight: 30}]}>
                    {item.bottomContent}
                  </Text>
                </View>
              </CollapseBody>
            </Collapse>
            <View
              style={{
                borderBottomColor: '#979797',
                borderBottomWidth: 1,
                marginVertical: verticalScale(20),
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#F9F9F9',
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  subHeadingView: {
    // marginTop: verticalScale(16),
  },
  contentView: {
    flexDirection: 'row',
    marginVertical: verticalScale(12),
  },
  bodyView: {
    marginVertical: verticalScale(12),
  },
  collaspseTxt: {
    color: '#545454',
  },
});
